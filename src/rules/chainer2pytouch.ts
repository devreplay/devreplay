module.exports = [
    {
        condition: ['F.add'],
        consequent: ['torch.add'],
        description: "Batched addition (accumulating multiple tensors in a single call) is not supported.",
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.clipped_relu($1, $2=$2)'],
        consequent: ['$1.clamp(0, $2)'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.crelu($1, axis=1)'],
        consequent: ['torch.cat((F.relu($1), F.relu(-$1)))'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.hard_sigmoid($1)'],
        consequent: ['torch.clamp(x * 0.2 + 0.5, 0, 1)'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.swish($1, $2)'],
        consequent: ['$1 * F.sigmoid($2 * $1)'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.as_strided'],
        consequent: ['torch.as_strided'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.broadcast'],
        consequent: ['torch.broadcast_tensors'],
        description: "PyTorch operations perform broadcast automatically like as in NumPy: https://pytorch.org/docs/stable/notes/broadcasting.html",
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.cast'],
        consequent: ['Tensor.to'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.concat'],
        consequent: ['torch.cat'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.copy'],
        consequent: ['Tensor.to'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.depth2space'],
        consequent: ['F.pixel_shuffle'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.diagonal'],
        consequent: ['torch.diagonal'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.dstack([$1, $2])'],
        consequent: ['torch.cat([$1,$2],dim=2)'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.expand_dims($1, axis=$2)'],
        consequent: ['torch.unsqueeze($1, $2)'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.flatten'],
        consequent: ['torch.flatten'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.flip'],
        consequent: ['torch.flip'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.fliplr($1)'],
        consequent: ['torch.flip(x, 1)'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.flipud($1)'],
        consequent: ['torch.flip(x, 0)'],
        author: "Framework Migration Guide"
    },
    {
        condition: ['F.get_item($1, $2)'],
        consequent: ['$1[$2]'],
        author: "Framework Migration Guide"
    },
    {
        condition: [''],
        consequent: [''],
        author: "Framework Migration Guide"
    },
    {
        condition: [''],
        consequent: [''],
        author: "Framework Migration Guide"
    },
    {
        condition: [''],
        consequent: [''],
        author: "Framework Migration Guide"
    },
    {
        condition: [''],
        consequent: [''],
        author: "Framework Migration Guide"
    }
]