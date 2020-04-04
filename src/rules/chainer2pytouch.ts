module.exports = [
    {
        condition: ['chainer.Variable'],
        consequent: ['torch.Tensor'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.FunctionNode'],
        consequent: ['torch.autograd.Function'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.functions.*'],
        consequent: ['torch.nn.functional.*'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.Link'],
        consequent: ['torch.nn.Module'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.Chain'],
        consequent: ['torch.nn.Module'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.Sequential'],
        consequent: ['torch.nn.Sequential'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.dataset.DatasetMixin'],
        consequent: ['torch.utils.data.Dataset'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.iterators.*'],
        consequent: ['torch.utils.data.DataLoader'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.Optimizer'],
        consequent: ['torch.optim.Optimizer'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.optimizers.*'],
        consequent: ['torch.optim.*'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.training.Trainer'],
        consequent: ['ignite.engine.create_supervised_trainer()'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.training.Updater'],
        consequent: ['ignite.engine.create_supervised_trainer()'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.training.extensions.Evaluator'],
        consequent: ['ignite.engine.create_supervised_evaluator()'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['chainer.training.Extension'],
        consequent: ['ignite.handlers.*'],
        author: 'Framework Migration Guide'
    },
    {
        condition: [''],
        consequent: [''],
        author: 'Framework Migration Guide'
    },
    {
        condition: [''],
        consequent: [''],
        author: 'Framework Migration Guide'
    },
    {
        condition: [''],
        consequent: [''],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.add'],
        consequent: ['torch.add'],
        description: 'Batched addition (accumulating multiple tensors in a single call) is not supported.',
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.clipped_relu($1, $2=$2)'],
        consequent: ['$1.clamp(0, $2)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.crelu($1, axis=1)'],
        consequent: ['torch.cat((F.relu($1), F.relu(-$1)))'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.hard_sigmoid($1)'],
        consequent: ['torch.clamp(x * 0.2 + 0.5, 0, 1)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.swish($1, $2)'],
        consequent: ['$1 * F.sigmoid($2 * $1)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.as_strided'],
        consequent: ['torch.as_strided'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.broadcast'],
        consequent: ['torch.broadcast_tensors'],
        description: 'PyTorch operations perform broadcast automatically like as in NumPy: https://pytorch.org/docs/stable/notes/broadcasting.html',
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.cast'],
        consequent: ['Tensor.to'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.concat'],
        consequent: ['torch.cat'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.copy'],
        consequent: ['Tensor.to'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.depth2space'],
        consequent: ['F.pixel_shuffle'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.diagonal'],
        consequent: ['torch.diagonal'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.dstack([$1, $2])'],
        consequent: ['torch.cat([$1,$2],dim=2)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.expand_dims($1, axis=$2)'],
        consequent: ['torch.unsqueeze($1, $2)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.flatten'],
        consequent: ['torch.flatten'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.flip'],
        consequent: ['torch.flip'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.fliplr($1)'],
        consequent: ['torch.flip(x, 1)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.flipud($1)'],
        consequent: ['torch.flip(x, 0)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.get_item($1, $2)'],
        consequent: ['$1[$2]'],
        author: 'Framework Migration Guide',
        description: 'Use direct indexing'
    },
    {
        condition: ['F.hstack'],
        consequent: ['torch.cat([a,b],dim=1)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.im2col'],
        consequent: ['F.unfold'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.moveaxis'],
        consequent: ['Tensor.permute'],
        author: 'Framework Migration Guide',
        description: 'See: https://discuss.pytorch.org/t/swap-axes-in-pytorch/970/2'
    },
    {
        condition: ['F.pad_sequence'],
        consequent: ['nn.utils.rnn.pad_squence'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.permutate'],
        consequent: ['Tensor.permute'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.repeat'],
        consequent: ['Tensor.repeat'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.reshape'],
        consequent: ['torch.reshape'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.resize_images'],
        consequent: ['F.interpolate'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.rollaxis'],
        consequent: ['Tensor.premute'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.scatter_add'],
        consequent: ['Tensor.scatter_add'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.select_item'],
        consequent: ['torch.gather(x, 1, t[:, None])[:, 0]'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.separate'],
        consequent: ['torch.split'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.spatial_transformer_grid'],
        consequent: ['F.affine_grid'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.spatial_transformer_sampler'],
        consequent: ['F.grid_sample'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.split_axis'],
        consequent: ['torch.split'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.squeeze'],
        consequent: ['torch.squeeze'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.stack'],
        consequent: ['torch.stack'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.tile'],
        consequent: ['F.repeat'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.transpose'],
        consequent: ['torch.t'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.vstack'],
        consequent: ['torch.cat([a,b],dim=0)'],
        author: 'Framework Migration Guide'
    },
    {
        condition: ['F.where'],
        consequent: ['torch.where'],
        author: 'Framework Migration Guide'
    }
];
