from django.db import models


class Lead(models.Model):
    """
    A potential lead that comes from a source.
    """
    email = models.EmailField()
    source = models.URLField()

    def __str__(self):
        return self.email


class Game(models.Model):
    """
    An instance of a game.
    """
    code = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    player1_id = models.CharField(max_length=255, null=True, blank=True)
    player2_id = models.CharField(max_length=255, null=True, blank=True)


    def __str__(self):
        return self.name