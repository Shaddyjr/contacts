from django.contrib import admin
from .models import Connection, Contact


# Register your models here.
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "next_connection",
        "cadence",
        "contact_method",
        "state",
    )

    fields = (
        "name",
        "next_connection",
        "cadence",
        "contact_method",
        "state",
        "note",
    )


@admin.register(Connection)
class ConnectionAdmin(admin.ModelAdmin):
    # readonly_fields = ("date",)
    list_display = (
        "contact",
        "date",
    )

    fields = (
        "contact",
        "date",
        "note",
    )
