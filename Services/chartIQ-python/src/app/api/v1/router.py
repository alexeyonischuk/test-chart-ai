from fastapi import APIRouter, status
from fastapi.responses import HTMLResponse
from src.app.api.v1.views import generate_study_view, process_form, show_form
from src.app.core.schemas import StudyResponse


router = APIRouter()
html = APIRouter()

html.add_api_route(
    path="/generate_study",
    endpoint=show_form,
    methods=["GET"],
    status_code=status.HTTP_200_OK,
    response_class=HTMLResponse
)

html.add_api_route(
    path="/generate_study",
    endpoint=process_form,
    methods=["POST"],
    status_code=status.HTTP_200_OK,
    response_class=HTMLResponse
)
router.add_api_route(
    path="/generate",
    endpoint=generate_study_view,
    methods=["POST"],
    status_code=status.HTTP_200_OK,
    response_model=StudyResponse,
)
