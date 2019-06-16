def replay(code, rule) -> str:
    return ""

def search_triggarable_rule(code, rules) -> list:
    return rules[0]

def main():
    code = ""
    rules = []
    rule = search_triggarable_rule(code, rules)
    fixed_code = replay(code, rule)
    print(fixed_code)

if __name__ == "__main__":
    main()