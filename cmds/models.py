from django.db import models

# Create your models here.
class BOOK_INFO(models.Model):
    book_id = models.AutoField(primary_key=True, db_column='book_id')
    book_name = models.CharField(max_length=255, null=False, blank=False, db_index=True, db_column='book_name')
    book_author = models.CharField(max_length=255, null=True, default=None, db_column='book_author')
    book_translator = models.CharField(max_length=255, null=True, default=None, db_column='book_translator')
    book_pages = models.IntegerField(null=True, default=None, db_column='book_pages')
    book_publisher = models.CharField(max_length=255, null=True, default=None, db_column='book_publisher')
    book_class = models.CharField(max_length=100, null=True, default=None, db_column='book_class')
    book_publish_date = models.DateField(blank=True, null=True, default=None, db_column='book_publish_date')
    book_buy_date = models.DateField(auto_now=True, db_column='book_buy_date')
    book_description = models.TextField(db_column='book_description')

    def __str__(self):
        return self.book_name

    class Meta:
        db_table = 'BOOK_INFO'
        verbose_name = '书本信息'
        verbose_name_plural = verbose_name