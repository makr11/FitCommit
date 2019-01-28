import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import OptionsTable from './OptionsTable';

class CategoryTabs extends React.Component{
	state={
		categoryIndex: 0,
		anchor: undefined,
		id: null,
	};

	handleChange = (e) => {
    this.setState({ 
      categoryIndex: parseInt(e.currentTarget.id, 10), 
    });
	};

	openMenu = (e) => {
    this.setState({ 
      anchor: e.currentTarget, 
      id: e.currentTarget.id,
    });
  };

  closeMenu = () => {
    this.setState({ 
      anchor: null,
      id: null
    });
  }

	render(){
		const {
			openEditServicesForm,
			removeServices,
			service,
		} = this.props;

		const {
			categoryIndex,
			anchor,
			id
		} = this.state;

		const OptionMenu = 
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={this.closeMenu}
        onClick={this.closeMenu}
      >
        {/* Menu item sends name=undefined beacuse name isn't accessible*/}
        <MenuItem onClick={openEditServicesForm} id={id} name="option">
          Uredi
        </MenuItem>
        <MenuItem onClick={removeServices} id={id} name="option">
          Obriši
        </MenuItem>
      </Menu>

		return(
			<div >
				<AppBar position="static" color="default">
					<Tabs
						value={categoryIndex}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
					>
					{service.categories.map((category, index) => {
						return(
							<Tab 
								label={category.category} 
								key={category.id} id={index}
								onClick={this.handleChange}
							/>
						)
					})}
					</Tabs>
				</AppBar>
				<OptionsTable 
					options={service.categories[categoryIndex].options}
					openMenu={this.openMenu}
				/>
				{OptionMenu}
			</div>
		)
	}
}

export default CategoryTabs
