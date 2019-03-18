import React from 'react'
import { Provider, Subscribe } from 'unstated'

export const view = (controller, Templet) => {
      return  <Provider>
         <Subscribe to={[controller]}>
         {(ctrl) => <Templet controller={ctrl} />}
         </Subscribe>
      </Provider>
}

