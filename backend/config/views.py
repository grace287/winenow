from django.http import HttpResponse

def home(request):
    return HttpResponse("<h1>Welcome to the WineNow API</h1><p><a href='/api/docs/'>Go to API Docs</a></p>")
