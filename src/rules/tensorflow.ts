module.exports = [
    {
      condition: [
        'v1.get_variable'
      ],
      consequent: [
        'tf.Variable'
      ]
    },
    {
      condition: [
        'v1.variable_scope'
      ],
      consequent: [
        'tf.keras.layers.Layer'
      ]
    },
    {
      condition: [
        'v1.variable_scope'
      ],
      consequent: [
        'tf.keras.Model'
      ]
    },
    {
      condition: [
        'v1.variable_scope'
      ],
      consequent: [
        'tf.Module'
      ]
    },
    {
      condition: [
        '1e-8'
      ],
      consequent: [
        '1e-7'
      ]
    },
    {
      condition: [
        'Model.losses,'
      ],
      consequent: [
        'Model.get_losses_for'
      ]
    },
    {
      condition: [
        'v1.train.Optimizer'
      ],
      consequent: [
        'tf.keras.optimizers'
      ]
    },
    {
      condition: [
        'tf.compat.v1.metrics'
      ],
      consequent: [
        'tf.keras.metrics'
      ]
    },
    {
      condition: [
        'tf.compat.v1.losses.Reduction'
      ],
      consequent: [
        'tf.keras.losses.Reduction'
      ]
    },
    {
      condition: [
        'tf.compat.v1.train.Optimizer'
      ],
      consequent: [
        'tf.keras.optimizers'
      ]
    }
  ]