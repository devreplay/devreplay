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
    },
    {
      condition: [
        '$1 ** $2'
      ],
      consequent: [
        'tf.pow($1, $2)'
      ]
    },
    {
      condition: [
        '$1 + $2'
      ],
      consequent: [
        'tf.add($1, $2)'
      ]
    },
    {
      condition: [
        '$1 / $2'
      ],
      consequent: [
        'tf.divide($1, $2)'
      ]
    },
    {
      condition: [
        '$1 * $2'
      ],
      consequent: [
        'tf.multiply($1, $2)'
      ]
    },
    {
      condition: [
        '$1 - $2'
      ],
      consequent: [
        'tf.subtract($1, $2)'
      ]
    },
    {
      condition: [
        '$1 and $2'
      ],
      consequent: [
        'tf.logical_and($1, $2)'
      ]
    },
    {
      condition: [
        '$1 or $2'
      ],
      consequent: [
        'tf.logical_or($1, $2)'
      ]
    }
  ]