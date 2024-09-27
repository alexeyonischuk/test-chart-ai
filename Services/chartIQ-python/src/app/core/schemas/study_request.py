from pydantic import BaseModel


class StudyRequest(BaseModel):
    question: str
