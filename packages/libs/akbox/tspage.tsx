import React from "react";

type ITsPagePro = {
  name: string;
};
const TsPage: React.SFC<ITsPagePro> = p => {
  return <div>eeee{p.name}11111</div>;
};
export default TsPage;
