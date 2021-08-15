from src.models import Lead


def create_lead(*, email: str, source: str, ) -> Lead:
    lead = Lead(email=email, source=source)
    lead.full_clean()
    lead.save()

    return lead
