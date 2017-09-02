import {forbidExtraProps} from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import DocumentTitle from 'react-document-title';
import {connect} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {authStateChanged} from '../actions/actionCreators';
import {app} from '../base';

import App from './App';
import BlueprintGrid from './BlueprintGrid';
import Contact from './Contact';
import Account from './Account';
import Create from './Create';
import EditBlueprint from './EditBlueprint';
import FavoritesGrid from './FavoritesGrid';
import Header from './Header';
import Intro from './Intro';
import MostFavoritedGrid from './MostFavoritedGrid';
import NoMatch from './NoMatch';
import SingleBlueprint from './SingleBlueprint';
import UserGrid from './UserGrid';

class Root extends PureComponent
{
	static propTypes = forbidExtraProps({
		authStateChanged: PropTypes.func.isRequired,
	});

	componentWillMount()
	{
		app.auth().onAuthStateChanged((user) =>
		{
			this.props.authStateChanged(user);
			if (user)
			{
				const {uid, email, photoURL, emailVerified, providerData} = user;

				const providerId          = providerData && providerData.length && providerData[0].providerId;
				const providerDisplayName = providerId ? providerData[0].displayName : undefined;

				const buildUserInformation = (existingUser) =>
				{
					const existingUserInitialized = existingUser || {};
					const displayName             = existingUserInitialized.displayName || providerDisplayName;
					return {
						...existingUserInitialized,
						displayName,
						providerDisplayName,
						photoURL,
						email,
						emailVerified,
						providerId,
					};
				};

				app.database()
					.ref(`/users/${uid}/`)
					.transaction(buildUserInformation);
			}
		}, console.log);
	}

	renderIntro = () => (
		<div>
			<Intro />
			<BlueprintGrid />
		</div>
	);
	renderTag   = (props) =>
	{
		const {pathname} = props.location;
		const tagId      = pathname.replace(/^\/tagged/, '');

		return <BlueprintGrid initialTag={tagId} />;
	};

	render()
	{
		return (
			<shell className='app-shell primary-content'>
				<DocumentTitle title='Factorio Prints'>
					<App>
						<BrowserRouter>
							<div>
								<Route path='/' component={Header} />
								<Switch>
									<Route path='/'           exact render={this.renderIntro} />
									<Route path='/blueprints' exact component={BlueprintGrid} />
									<Route path='/top'        exact component={MostFavoritedGrid} />
									<Route path='/create'     exact component={Create} />

									<Route path='/favorites'  exact component={FavoritesGrid} />
									<Route path='/contact'    exact component={Contact} />
									<Route path='/account'    exact component={Account} />
									<Route path='/view/:blueprintId'  component={SingleBlueprint} />
									<Route path='/edit/:blueprintId'  component={EditBlueprint} />
									<Route path='/user/:userId'       component={UserGrid} />
									<Route path='/tagged/:tag'        render={this.renderTag} />
									<Route component={NoMatch} />
								</Switch>
							</div>
						</BrowserRouter>
					</App>
				</DocumentTitle>
			</shell>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({authStateChanged}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Root);
