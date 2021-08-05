import { Rule } from '../rule';

export const rules: Rule[] = [
    {
      before: [
        'v1.get_variable'
      ],
      after: [
        'tf.Variable'
      ]
    },
    {
      before: [
        'v1.variable_scope'
      ],
      after: [
        'tf.keras.layers.Layer'
      ]
    },
    {
      before: [
        'v1.variable_scope'
      ],
      after: [
        'tf.keras.Model'
      ]
    },
    {
      before: [
        'v1.variable_scope'
      ],
      after: [
        'tf.Module'
      ]
    },
    {
      before: [
        '1e-8'
      ],
      after: [
        '1e-7'
      ]
    },
    {
      before: [
        'Model.losses,'
      ],
      after: [
        'Model.get_losses_for'
      ]
    },
    {
      before: [
        'v1.train.Optimizer'
      ],
      after: [
        'tf.keras.optimizers'
      ]
    },
    {
      before: [
        'tf.compat.v1.metrics'
      ],
      after: [
        'tf.keras.metrics'
      ]
    },
    {
      before: [
        'tf.compat.v1.losses.Reduction'
      ],
      after: [
        'tf.keras.losses.Reduction'
      ]
    },
    {
      before: [
        'tf.compat.v1.train.Optimizer'
      ],
      after: [
        'tf.keras.optimizers'
      ]
    },
    {
      before: [
        '$1 ** $2'
      ],
      after: [
        'tf.pow($1, $2)'
      ]
    },
    {
      before: [
        '$1 + $2'
      ],
      after: [
        'tf.add($1, $2)'
      ]
    },
    {
      before: [
        '$1 / $2'
      ],
      after: [
        'tf.divide($1, $2)'
      ]
    },
    {
      before: [
        '$1 * $2'
      ],
      after: [
        'tf.multiply($1, $2)'
      ]
    },
    {
      before: [
        '$1 - $2'
      ],
      after: [
        'tf.subtract($1, $2)'
      ]
    },
    {
      before: [
        '$1 and $2'
      ],
      after: [
        'tf.logical_and($1, $2)'
      ]
    },
    {
      before: [
        '$1 or $2'
      ],
      after: [
        'tf.logical_or($1, $2)'
      ]
    }
  ];
  