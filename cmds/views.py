from django.shortcuts import render

# Create your views here.
def query(request):
    if request.POST == 'POST':
        pass
    render(request, 'query.html', context=book_data)