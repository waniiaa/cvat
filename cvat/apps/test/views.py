from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cvat.apps.engine.models import LabeledShape


class ClassCountView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, task_id):
        rows = (
        # A shape has no task field. Follow shape -> job -> segment -> task.
            LabeledShape.objects.filter(job__segment__task_id=task_id)
         # Take the class name from the related Label model.
    .values("label__name")
            .annotate(count=Count("id")) # Count per class in the database (one GROUP BY query),# not in Python.
            .order_by("label__name")
        )
        counts = [{"label": row["label__name"], "count": row["count"]} for row in rows]
        return Response({"task_id": task_id, "counts": counts})