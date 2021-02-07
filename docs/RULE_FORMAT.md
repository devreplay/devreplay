```json
{
  "before": [
    "([a-z]+)-([a-z]+)"
  ],
  "after": [
      "$1 $2"
  ],
  "isRegex": true
}
```

That will fix

```diff
- print("hello-world")
+ print("hello world")
```

* `before`: Target of search source code
* `after`: Replacement source code

* Output options;
    * `message`: Customized message
    * `severity`: Rule severity info / warnings (default) / error

* Search/Replacement options:
    * `matchCase`: Use CaseSensitive search
    * `wholeWord`: Match whole word
    * `isRegex`: Use regular expression for search
    * `preserveCase`: Use preserve case for replacement