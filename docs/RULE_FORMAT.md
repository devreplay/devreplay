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
* (Option) `after`: Replacement source code

* Output options;
  * `message`: Customized message
  * `severity`: Rule severity error / warning (default) / info / hint / off

* Search/Replacement options:
  * `matchCase`: Use CaseSensitive search
  * `wholeWord`: Match whole word
  * `isRegex`: Use regular expression for search
  * `preserveCase`: Use preserve case for replacement
