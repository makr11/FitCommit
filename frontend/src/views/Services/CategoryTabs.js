import React from 'react';
// material ui core components
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
// material ui icons
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
// app components
import OptionsTable from './OptionsTable';


class CategoryTabs extends React.Component{
	state={
		categoryIndex: 0,
		categoryId: this.props.service["categories"][0].id,
		anchor: undefined,
		id: null,
	};

	handleChange = (e) => {
		let categoryIndex = parseInt(e.currentTarget.id, 10)
    this.setState({ 
			...this.state,
			categoryIndex: categoryIndex,
			categoryId: this.props.service["categories"][categoryIndex].id
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
	
	removeCategory = (e) => {
		this.setState({
			...this.state,
			categoryIndex: this.state.categoryIndex - 1
		});
		this.props.removeServices(e)
	}

	render(){
		const {
			openNewServicesForm,
			openEditServicesForm,
			removeServices,
			service,
		} = this.props;

		const {
			categoryIndex,
			categoryId,
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
				<AppBar position="static" color="default">
					<div style={{ display: "flex", flexDirection: "row-reverse"}}>
						<IconButton onClick={this.removeCategory} id={categoryId} name='category'>
							<DeleteIcon style={{ fontSize: 20}}/>
						</IconButton>
						<IconButton onClick={openEditServicesForm} id={categoryId} name='category'>
							<CreateIcon style={{ fontSize: 20}}/>
						</IconButton>
						<IconButton onClick={openNewServicesForm} id={categoryId} name='category'>
							<AddIcon style={{ fontSize: 20, }} />
						</IconButton>
					</div>
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
