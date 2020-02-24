import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/property-group">
      <Translate contentKey="global.menu.entities.storagePropertyGroup" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/property">
      <Translate contentKey="global.menu.entities.storageProperty" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/record-group">
      <Translate contentKey="global.menu.entities.storageRecordGroup" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/record-template">
      <Translate contentKey="global.menu.entities.storageRecordTemplate" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/record-field">
      <Translate contentKey="global.menu.entities.storageRecordField" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/record">
      <Translate contentKey="global.menu.entities.storageRecord" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/record-value">
      <Translate contentKey="global.menu.entities.storageRecordValue" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
