module.exports = [
    {
        before: ['chainer.Variable'],
        after: ['torch.Tensor'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.FunctionNode'],
        after: ['torch.autograd.Function'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.functions.*'],
        after: ['torch.nn.functional.*'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.Link'],
        after: ['torch.nn.Module'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.Chain'],
        after: ['torch.nn.Module'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.Sequential'],
        after: ['torch.nn.Sequential'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.dataset.DatasetMixin'],
        after: ['torch.utils.data.Dataset'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.iterators.*'],
        after: ['torch.utils.data.DataLoader'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.Optimizer'],
        after: ['torch.optim.Optimizer'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.optimizers.*'],
        after: ['torch.optim.*'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.training.Trainer'],
        after: ['ignite.engine.create_supervised_trainer()'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.training.Updater'],
        after: ['ignite.engine.create_supervised_trainer()'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.training.extensions.Evaluator'],
        after: ['ignite.engine.create_supervised_evaluator()'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['chainer.training.Extension'],
        after: ['ignite.handlers.*'],
        author: 'Framework Migration Guide'
    },
    {
        before: [''],
        after: [''],
        author: 'Framework Migration Guide'
    },
    {
        before: [''],
        after: [''],
        author: 'Framework Migration Guide'
    },
    {
        before: [''],
        after: [''],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.add'],
        after: ['torch.add'],
        message: 'Batched addition (accumulating multiple tensors in a single call) is not supported.',
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.clipped_relu($1, $2=$2)'],
        after: ['$1.clamp(0, $2)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.crelu($1, axis=1)'],
        after: ['torch.cat((F.relu($1), F.relu(-$1)))'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.hard_sigmoid($1)'],
        after: ['torch.clamp(x * 0.2 + 0.5, 0, 1)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.swish($1, $2)'],
        after: ['$1 * F.sigmoid($2 * $1)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.as_strided'],
        after: ['torch.as_strided'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.broadcast'],
        after: ['torch.broadcast_tensors'],
        message: 'PyTorch operations perform broadcast automatically like as in NumPy: https://pytorch.org/docs/stable/notes/broadcasting.html',
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.cast'],
        after: ['Tensor.to'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.concat'],
        after: ['torch.cat'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.copy'],
        after: ['Tensor.to'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.depth2space'],
        after: ['F.pixel_shuffle'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.diagonal'],
        after: ['torch.diagonal'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.dstack([$1, $2])'],
        after: ['torch.cat([$1,$2],dim=2)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.expand_dims($1, axis=$2)'],
        after: ['torch.unsqueeze($1, $2)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.flatten'],
        after: ['torch.flatten'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.flip'],
        after: ['torch.flip'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.fliplr($1)'],
        after: ['torch.flip(x, 1)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.flipud($1)'],
        after: ['torch.flip(x, 0)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.get_item($1, $2)'],
        after: ['$1[$2]'],
        author: 'Framework Migration Guide',
        message: 'Use direct indexing'
    },
    {
        before: ['F.hstack'],
        after: ['torch.cat([a,b],dim=1)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.im2col'],
        after: ['F.unfold'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.moveaxis'],
        after: ['Tensor.permute'],
        author: 'Framework Migration Guide',
        message: 'See: https://discuss.pytorch.org/t/swap-axes-in-pytorch/970/2'
    },
    {
        before: ['F.pad_sequence'],
        after: ['nn.utils.rnn.pad_squence'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.permutate'],
        after: ['Tensor.permute'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.repeat'],
        after: ['Tensor.repeat'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.reshape'],
        after: ['torch.reshape'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.resize_images'],
        after: ['F.interpolate'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.rollaxis'],
        after: ['Tensor.premute'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.scatter_add'],
        after: ['Tensor.scatter_add'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.select_item'],
        after: ['torch.gather(x, 1, t[:, None])[:, 0]'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.separate'],
        after: ['torch.split'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.spatial_transformer_grid'],
        after: ['F.affine_grid'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.spatial_transformer_sampler'],
        after: ['F.grid_sample'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.split_axis'],
        after: ['torch.split'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.squeeze'],
        after: ['torch.squeeze'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.stack'],
        after: ['torch.stack'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.tile'],
        after: ['F.repeat'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.transpose'],
        after: ['torch.t'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.vstack'],
        after: ['torch.cat([a,b],dim=0)'],
        author: 'Framework Migration Guide'
    },
    {
        before: ['F.where'],
        after: ['torch.where'],
        author: 'Framework Migration Guide'
    }
];
