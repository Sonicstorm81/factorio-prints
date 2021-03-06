import {forbidExtraProps}          from 'airbnb-prop-types';
import PropTypes                   from 'prop-types';
import ImgurImageSummaryProjection from './ImgurImageSummaryProjection';

/**
 * Auto-generated by com.klass.generator.react.prop.type.PropTypeSourceCodeProjectionVisitor
 * at 2019-07-07T21:47:01.061Z
 */
const BlueprintSummaryProjection = PropTypes.shape(forbidExtraProps({
	key              : PropTypes.string.isRequired,
	title            : PropTypes.string.isRequired,
	numberOfUpvotes  : PropTypes.number.isRequired,
	numberOfDownvotes: PropTypes.number.isRequired,
	imgurImage       : ImgurImageSummaryProjection.isRequired,
	systemFrom       : PropTypes.string.isRequired,
	systemTo         : PropTypes.string,
	createdOn        : PropTypes.string.isRequired,
}));

export default BlueprintSummaryProjection;
