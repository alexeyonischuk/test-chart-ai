import os
import time

import aiofiles
import jsbeautifier
from openai import OpenAI
from src.app.core.infrastructure.config_constructor import load_config
from src.app.core.schemas import StudyRequest, StudyResponse

config = load_config()

_client = OpenAI(api_key=config.chart_iq.open_ai_api_key)

parent_dir = os.path.abspath(os.path.join(os.getcwd(), os.pardir))

_HTML_FILE_PATH = os.path.join(parent_dir, 'chartiq-project/Services/chartIQ-JS/chartiq/active-trader-chart.html')

print(f"Trying to access HTML file at path: {_HTML_FILE_PATH}")
# print("Files in the directory:", os.listdir(os.path.dirname(_HTML_FILE_PATH)))

_STUDIES_DIR = '/chartiq-project/shared/'


def _create_thread_with_assistant(prompt: str):
    """Creates a thread with OpenAI assistant and retrieves the response."""
    try:
        thread = _client.beta.threads.create()

        _client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=prompt
        )

        run = _client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=config.chart_iq.assistant_id
        )

        while run.status != 'completed':
            run = _client.beta.threads.runs.retrieve(thread_id=thread.id, run_id=run.id)
            time.sleep(2)

        messages = _client.beta.threads.messages.list(thread_id=thread.id)

        for message in messages:
            if message.role == 'assistant':
                return message.content[0].text.value

    except Exception as e:
        print(f"Error with assistant interaction: {e}")
        return None


async def _get_next_file_name(directory: str) -> str:
    """Generates the next available 'test' JavaScript file name in the given directory."""
    if not os.path.exists(directory):
        os.makedirs(directory)

    files = os.listdir(directory)
    test_files = [f for f in files if f.startswith("test") and f.endswith(".js")]

    if test_files:
        numbers = [int(f[4:-3]) for f in test_files]
        next_number = max(numbers) + 1
    else:
        next_number = 1

    return f"test{next_number}.js"


def _format_js_code(js_code: str) -> str:
    """Formats JavaScript code using jsbeautifier."""
    opts = jsbeautifier.default_options()
    opts.indent_size = 4
    return jsbeautifier.beautify(js_code, opts)

import os
print(f"Current working directory: {os.getcwd()}")

async def _update_html_with_study(file_name: str) -> str:
    """Updates the HTML file by adding an import line for the generated study."""
    print('-----------------------------------------------------------------')
    print(f"Trying to access HTML file at path: {_HTML_FILE_PATH}")

    if not os.path.exists(_HTML_FILE_PATH):
        print(f"File not found: {_HTML_FILE_PATH}")
        raise FileNotFoundError(f"HTML file not found at path: {_HTML_FILE_PATH}")

    async with aiofiles.open(_HTML_FILE_PATH, 'r', encoding='utf-8') as f:
        html_content = await f.read()

    import_line = f'import "/js/advanced/studies/{file_name}";'

    if import_line not in html_content:
        html_content = html_content.replace('</script>', f'{import_line}\n</script>')

    async with aiofiles.open(_HTML_FILE_PATH, 'w', encoding='utf-8') as f:
        await f.write(html_content)

    print(f"Successfully updated HTML file with import for {file_name}")
    return f"HTML file updated with import for {file_name}"


async def generate_js_code(question: StudyRequest) -> StudyResponse:
    """Generates JavaScript code based on the provided study request."""
    response = _create_thread_with_assistant(question)

    if not response:
        return StudyResponse(error="Error generating code.")

    clean_code = response.replace('```javascript', '').replace('```', '').strip()
    clean_code = '\n'.join([line.strip() for line in clean_code.splitlines() if line.strip()])
    formatted_code = _format_js_code(clean_code)

    directory = _STUDIES_DIR
    if not os.path.exists(directory):
        os.makedirs(directory)

    file_name = await _get_next_file_name(directory)
    file_path = os.path.join(directory, file_name)

    async with aiofiles.open(file_path, 'w', encoding='utf-8') as js_file:
        await js_file.write(formatted_code)

    await _update_html_with_study(file_name)

    return f"Code successfully saved to {file_path} and HTML updated."
