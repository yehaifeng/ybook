#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.views.generic import View
from django.shortcuts import render, HttpResponse
from cmds import models
import json
from django.template import RequestContext
from django.forms.models import model_to_dict
from cmds.pkgs.divpage import MarkPage,PageInfo


class Query(View):
    def __init__(self):
        pass
    def get(self, request):
        book_qs = models.BOOK_INFO.objects.all()[:10]
        book_list = []
        for q in book_qs:
            tmp_dict = {}
            tmp_dict['name'] = q.book_name
            tmp_dict['author'] = q.book_author
            tmp_dict['translator'] = q.book_translator
            tmp_dict['publisher'] = q.book_publisher
            tmp_dict['publish_date'] = q.book_publish_date
            book_list.append(tmp_dict)
        # book_dict = model_to_dict(book_list)
        book_dict = {'book_list':book_list}
        return render(request, 'query.html', context=book_dict)
    def post(self, request):
        req_dict = {}
        ret_data = []
        if request.is_ajax() and request.method == 'POST':
            for key in request.POST:
                value = request.POST.getlist(key)[0]
                req_dict[key] = value
            # data_dict = request.POST.dict
        if req_dict['querybookname'] == '' and req_dict['queryauthor'] == '':
            ret_queryset = models.BOOK_INFO.objects.all()[:10].values('book_name', 'book_author', 'book_translator', 'book_publisher')

        else:
            ret_queryset = models.BOOK_INFO.objects.filter(book_name__contains=req_dict['querybookname'], book_author__contains=req_dict['queryauthor']).values('book_name', 'book_author', 'book_translator', 'book_publisher')

        for i in ret_queryset:
            ret_data.append(i)
        print(type(ret_data), json.dumps(ret_data))
        return HttpResponse(json.dumps(ret_data))