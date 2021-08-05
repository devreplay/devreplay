import { Rule } from '../rule';

export const rules: Rule[] = [
    {
      before: [
        '<template slot'
      ],
      after: [
        '<template v-slot'
      ]
    },
    {
      before: [
        '<template slot-scope'
      ],
      after: [
        '<template v-slot:item="slotProps"'
      ]
    },
    {
      before: [
        '<template slot="${1:item}" slot-scope="{${2:item2}}">'
      ],
      after: [
        '<template v-slot:${1:item}="{${2:item2}}">'
      ]
    }
  ];
