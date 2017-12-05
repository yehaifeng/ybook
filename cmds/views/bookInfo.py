#!/usr/bin/env python
# -*- coding:utf-8 -*-
from django.views.generic import View
from django.shortcuts import render, HttpResponse
from cmds import models
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
        render(request, 'query.html', context=book_list)
    def post(self):
        pass