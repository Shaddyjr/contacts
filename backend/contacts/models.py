from django.db import models


# Create your models here.
class Contact(models.Model):
    #  DUPLICATED CONSTANTS FROM util.js
    MONTHLY = "monthly"
    QUARTERLY = "quarterly"
    SEMIANUALLY = "semiannually"
    ANUALLY = "annually"

    CADENCES = [
        (MONTHLY, "Monthly"),
        (QUARTERLY, "Quarterly"),
        (SEMIANUALLY, "Semiannually"),
        (ANUALLY, "Annually"),
    ]

    EMAIL = "email"
    FACEBOOK = "facebook"
    SIGNAL = "signal"
    TEXT = "text"
    PHONECALL = "phonecall"
    DISCORD = "discord"
    LINKEDIN = "linkedin"
    WHATSAPP = "whatsapp"
    SLACK = "slack"

    CONTACT_METHODS = [
        (EMAIL, "Email"),
        (FACEBOOK, "Facebook"),
        (SIGNAL, "Signal"),
        (TEXT, "Text"),
        (PHONECALL, "Phonecall"),
        (DISCORD, "Discord"),
        (LINKEDIN, "LinkedIn"),
        (WHATSAPP, "WhatsApp"),
        (SLACK, "Slack"),
    ]

    ACTIVE = "active"
    ARCHIVED = "archived"

    STATES = [
        (ACTIVE, "Active"),
        (ARCHIVED, "Archived"),
    ]

    name = models.CharField(max_length=30)
    next_connection = models.DateField(blank=True)
    note = models.TextField(blank=True)
    cadence = models.CharField(
        max_length=20,
        choices=CADENCES,
        default=ANUALLY,
    )
    contact_method = models.CharField(
        max_length=20,
        choices=CONTACT_METHODS,
        default=EMAIL,
    )
    state = models.CharField(
        max_length=20,
        choices=STATES,
        default=ACTIVE,
    )

    def __str__(self):
        return self.name


class Connection(models.Model):
    date = models.DateField(blank=True)
    note = models.TextField(blank=True)
    contact = models.ForeignKey(
        Contact, on_delete=models.CASCADE, related_name="connections"
    )

    def __str__(self):
        return f"{self.contact.name} Connection ({self.date})"
