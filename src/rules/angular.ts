module.exports = [
    {
      condition: [
        'DeprecatedI18NPipesModule'
      ],
      consequent: [
        'CommonModule'
      ]
    },
    {
      condition: [
        'DeprecatedCurrencyPipe'
      ],
      consequent: [
        'CurrencyPipe'
      ]
    },
    {
      condition: [
        'DeprecatedDatePipe'
      ],
      consequent: [
        'DatePipe'
      ]
    },
    {
      condition: [
        'DeprecatedDecimalPipe'
      ],
      consequent: [
        'DecimalPipe'
      ]
    },
    {
      condition: [
        'DeprecatedPercentPipe'
      ],
      consequent: [
        'PercentPipe'
      ]
    },
    {
      condition: [
        'CollectionChangeRecord'
      ],
      consequent: [
        'IterableChangeRecord'
      ]
    },
    {
      condition: [
        'defineInjectable'
      ],
      consequent: [
        'ɵɵdefineInjectable'
      ]
    },
    {
      condition: [
        'ReflectiveInjector'
      ],
      consequent: [
        'Injector.create'
      ]
    },
    {
      condition: [
        'RenderComponentType'
      ],
      consequent: [
        'RendererType2'
      ]
    },
    {
      condition: [
        'RenderComponentType'
      ],
      consequent: [
        'Renderer2'
      ]
    },
    {
      condition: [
        'Renderer'
      ],
      consequent: [
        'Renderer2'
      ]
    },
    {
      condition: [
        'RootRenderer'
      ],
      consequent: [
        'RendererFactory2'
      ]
    },
    {
      condition: [
        'ViewEncapsulation.Native'
      ],
      consequent: [
        'ViewEncapsulation.ShadowDom'
      ]
    },
    {
      condition: [
        'preserveQueryParams'
      ],
      consequent: [
        'queryParamsHandling'
      ]
    },
    {
      condition: [
        'getAngularLib'
      ],
      consequent: [
        'getAngularJSGlobal'
      ]
    },
    {
      condition: [
        'setAngularLib'
      ],
      consequent: [
        'setAngularJSGlobal'
      ]
    },
    {
      condition: [
        '<ngForm #${1:value}=${1:str}>'
      ],
      consequent: [
        '<ng-Form #${1:value}=${1:str}>'
      ]
    },
    {
      condition: [
        'ReflectiveInjector.resolveAndCreate(${1:providers});'
      ],
      consequent: [
        'Injector.create({${1:providers}});'
      ]
    },
    {
      condition: [
        'const routes: Routes = [{',
        '${1:path}',
        '    ${2:loadChildren}: ${3:pathstring}#${4:Module}',
        '}];'
      ],
      consequent: [
        'const routes: Routes = [{',
        '${1:path}',
        '    ${2:loadChildren}: () => import(${3:pathstring}).then(m => m.${4:Module})',
        '}];'
      ]
    },
    {
      condition: [
        'params'
      ],
      consequent: [
        'paramsMap'
      ]
    },
    {
      condition: [
        'queryParams'
      ],
      consequent: [
        'queryParamsMap'
      ]
    },
    {
      condition: [
        '@angular/http'
      ],
      consequent: [
        '@angular/common/http'
      ]
    },
    {
      condition: [
        '@angular/http/testing'
      ],
      consequent: [
        '@angular/common/http/testing'
      ]
    }
  ]