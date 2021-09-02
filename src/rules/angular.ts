import { BaseRule } from '../core/rule';

export const rules: BaseRule[] = [
    {
      before: [
        'DeprecatedI18NPipesModule'
      ],
      after: [
        'CommonModule'
      ]
    },
    {
      before: [
        'DeprecatedCurrencyPipe'
      ],
      after: [
        'CurrencyPipe'
      ]
    },
    {
      before: [
        'DeprecatedDatePipe'
      ],
      after: [
        'DatePipe'
      ]
    },
    {
      before: [
        'DeprecatedDecimalPipe'
      ],
      after: [
        'DecimalPipe'
      ]
    },
    {
      before: [
        'DeprecatedPercentPipe'
      ],
      after: [
        'PercentPipe'
      ]
    },
    {
      before: [
        'CollectionChangeRecord'
      ],
      after: [
        'IterableChangeRecord'
      ]
    },
    {
      before: [
        'defineInjectable'
      ],
      after: [
        'ɵɵdefineInjectable'
      ]
    },
    {
      before: [
        'ReflectiveInjector'
      ],
      after: [
        'Injector.create'
      ]
    },
    {
      before: [
        'RenderComponentType'
      ],
      after: [
        'RendererType2'
      ]
    },
    {
      before: [
        'RenderComponentType'
      ],
      after: [
        'Renderer2'
      ]
    },
    {
      before: [
        'Renderer'
      ],
      after: [
        'Renderer2'
      ]
    },
    {
      before: [
        'RootRenderer'
      ],
      after: [
        'RendererFactory2'
      ]
    },
    {
      before: [
        'ViewEncapsulation.Native'
      ],
      after: [
        'ViewEncapsulation.ShadowDom'
      ]
    },
    {
      before: [
        'preserveQueryParams'
      ],
      after: [
        'queryParamsHandling'
      ]
    },
    {
      before: [
        'getAngularLib'
      ],
      after: [
        'getAngularJSGlobal'
      ]
    },
    {
      before: [
        'setAngularLib'
      ],
      after: [
        'setAngularJSGlobal'
      ]
    },
    {
      before: [
        '<ngForm #${1:value}=${1:str}>'
      ],
      after: [
        '<ng-Form #${1:value}=${1:str}>'
      ]
    },
    {
      before: [
        'ReflectiveInjector.resolveAndCreate(${1:providers});'
      ],
      after: [
        'Injector.create({${1:providers}});'
      ]
    },
    {
      before: [
        'const routes: Routes = [{',
        '${1:path}',
        '    ${2:loadChildren}: ${3:pathstring}#${4:Module}',
        '}];'
      ],
      after: [
        'const routes: Routes = [{',
        '${1:path}',
        '    ${2:loadChildren}: () => import(${3:pathstring}).then(m => m.${4:Module})',
        '}];'
      ]
    },
    {
      before: [
        'params'
      ],
      after: [
        'paramsMap'
      ]
    },
    {
      before: [
        'queryParams'
      ],
      after: [
        'queryParamsMap'
      ]
    },
    {
      before: [
        '@angular/http'
      ],
      after: [
        '@angular/common/http'
      ]
    },
    {
      before: [
        '@angular/http/testing'
      ],
      after: [
        '@angular/common/http/testing'
      ]
    }
  ];
