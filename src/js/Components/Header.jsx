import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarNavigationIcon,
    TopAppBarActionItem,
    TopAppBarTitle
} from '@rmwc/top-app-bar';

import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarMenuIcon, ToolbarIcon } from '@rmwc/toolbar';

export class Header extends React.Component {
    render() {
        return (
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <TopAppBarNavigationIcon aria-label="Menu" alt="Menu">
                            <FontAwesomeIcon icon="bars" fixedWidth />
                        </TopAppBarNavigationIcon>
                        <TopAppBarTitle>Title</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <TopAppBarActionItem aria-label="Download" alt="Download">
                            <FontAwesomeIcon icon="save" fixedWidth />
                        </TopAppBarActionItem>
                        <TopAppBarActionItem aria-label="Print this page" alt="Print this page">
                            <FontAwesomeIcon icon="print" fixedWidth />
                        </TopAppBarActionItem>
                        <TopAppBarActionItem aria-label="Bookmark this page" alt="Bookmark this page">
                            <FontAwesomeIcon icon="bookmark" fixedWidth />
                        </TopAppBarActionItem>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
        );
    }
}

export default Header;

/*<Toolbar waterfall>
                <ToolbarRow>
                    <ToolbarSection alignStart>
                        <ToolbarMenuIcon icon="menu" />
                        <ToolbarTitle>Toolbar</ToolbarTitle>
                    </ToolbarSection>
                    <ToolbarSection alignEnd>
                        <ToolbarIcon icon="save" />
                        <ToolbarIcon icon="print" />
                    </ToolbarSection>
                </ToolbarRow>
            </Toolbar>*/
