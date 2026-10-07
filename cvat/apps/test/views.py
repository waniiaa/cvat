from django.db.models import Count
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cvat.apps.engine.models import LabeledShape, Task
from cvat.apps.engine.permissions import TaskPermission


class ClassCountView(APIView):
    # Replaces CVAT's default permission classes, which need `view.detail`
    # (only ViewSets have it). Task access is checked in get() instead.
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id):
        # Same filter CVAT uses for the task list: only tasks this user may see.
        visible_tasks = TaskPermission.create_scope_list(request).filter(Task.objects.all())
        # Unknown or hidden task -> 404, so we do not reveal that it exists.
        get_object_or_404(visible_tasks, pk=task_id)

        rows = (
            # A shape has no task field. Follow shape -> job -> segment -> task.
            LabeledShape.objects.filter(job__segment__task_id=task_id)
            # Take the class name from the related Label model.
            .values("label__name")
            # Count per class in the database (one GROUP BY query), not in Python.
            .annotate(count=Count("id"))
            .order_by("label__name")
        )
        counts = [{"label": row["label__name"], "count": row["count"]} for row in rows]
        return Response({"task_id": task_id, "counts": counts})