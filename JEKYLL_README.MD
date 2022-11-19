{% assign i = 0 %}
{%for post in site.posts%}
    {% assign i = i | plus:1 %}
{%endfor%}
{{i}}