import React from "React";
import { BoxReact, Box, IBoxConfig, BoxProps, view } from "akbox/box";
export class XXXReact<T extends XXXProps<IReactXXXBox>> extends BoxReact<T> {
  pSender() {
    return <div>XXXBox</div>
  }
}

export interface IReactXXXBox extends Box {}

export interface IXXXConfig extends IBoxConfig {}

@view({ com: XXXReact })
export class XXXBox extends Box implements IReactXXXBox {
  public constructor(config?: IXXXConfig) {
    super(config);
  }
}

export class XXXProps<T extends IReactXXXBox> extends BoxProps<T> {}
