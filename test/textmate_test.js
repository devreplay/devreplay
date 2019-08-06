const dollar = /\$(\d+)/gm;
let condition =  "$0.$1.find_by(tool: $2).$3"

let consequent = " $0.$1.find_by!(tool: $2).$3"
condition = "for $0 in xrange($1.$2):"
consequent = "\tfor $0 in six.moves.range($1.$2):"
// const regex = /(\w+)\.(\w+)\.find_by\(tool: (\w+)\)\.(\w+)/gm;
const str  = `
a.b.find_by(tool: aaa).a

console.log.find_by(tool: aaa).a
     

for a in xrange(array.x):
`;
const str2 = `a.b.find_by!(tool: c).d`;

condition = condition.replace(dollar, function (x) { return "$" + (parseInt(x[1])+1).toString() })
consequent = consequent.replace(dollar, function (x) { return "$" + (parseInt(x[1])+1).toString() })

// let m;
// let condition_dollars = []
// let dollar_index = 0
// while ((m = dollar.exec(condition)) !== null) {
//     if (m.index === dollar.lastIndex) {
//         dollar.lastIndex++;
//     }
//     condition_dollars[dollar_index] = parseInt(m.map(x => x)[1])
//     dollar_index += 1
// }

// let consequent_dollars = []
// dollar_index = 0
// while ((m = dollar.exec(consequent)) !== null) {
//     if (m.index === dollar.lastIndex) {
//         dollar.lastIndex++;
//     }
//     consequent_dollars[dollar_index] = parseInt(m.map(x => x)[1])
//     dollar_index += 1
// }

condition = condition.replace(/[<>*()?.]/g, "\\$&")

let token_index = []
condition = condition.replace(dollar, function(x) {
    if (token_index.includes(x[1])){
        return `(\\k<token${x[1]}>)`
    }else{
        token_index.push(x[1])
        return `(?<token${x[1]}>\\w+)`
    }
})

const re_condition = new RegExp(condition, "gm")
// console.log(re_condition.test(str))
// console.log(re_condition.test(str2))

const matched_str = re_condition.exec(str)
if (matched_str == null) {
    return
}
console.log(re_condition)
console.log(matched_str)
const start_char = matched_str.index;
const end_char = matched_str.index + matched_str[0].length;
const start_slice = matched_str.input.slice(undefined, start_char);
const start_line = start_slice.split(/\r\n|\r|\n/).length;


console.log(str.replace(re_condition, consequent))

