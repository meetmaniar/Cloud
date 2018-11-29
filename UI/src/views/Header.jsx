import React from "react";
import {Panel, PanelHeading} from "../components/Elemental/Panel";

const Header = () =>  {
      return (
        <div className="header">
        <Panel>
          <PanelHeading class="header-panel">
            Recommender
          </PanelHeading>
        </Panel>
        </div>
      );
}

export default Header;
