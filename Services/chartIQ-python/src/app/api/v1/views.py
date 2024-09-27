from fastapi import Form, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from src.app.api.v1.service import generate_js_code
from src.app.core.schemas import StudyRequest, StudyResponse


templates = Jinja2Templates(directory="/app/src/app/templates")

async def generate_study_view(request: StudyRequest) -> StudyResponse:
    js_code = await generate_js_code(request.question)
    return StudyResponse(code=js_code)

async def show_form(request: Request) -> HTMLResponse:
    return templates.TemplateResponse("generate_study.html", {"request": request})

async def process_form(request: Request, question: str = Form(...)) -> HTMLResponse:
    study_request = StudyRequest(question=question)
    js_code = await generate_js_code(study_request)
    return templates.TemplateResponse("generate_study.html", {"request": request, "result": js_code})
