/* eslint-disable no-useless-escape, react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const isRelativeUrlRegex = /^[^\/]+\/[^\/].*$|^\/[^\/].*$/;
const fileExtensionRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
const defaultTarget = '_blank';
var hrefTitle =""
const defaultRel = 'nofollow noopener noreferrer';
const sameSiteRegex = new RegExp(`https?:\/\/${process.env.REACT_APP_SITE_DOMAIN}/`);

const SmartLink = (props) => {
  const href = props.href.replace(sameSiteRegex, '');
  hrefTitle = (props.title == "" ? props.href : props.title);

  if (!isRelativeUrlRegex.test(href)) {
    return (
      <a href={href} target={defaultTarget} title={hrefTitle} rel={defaultRel} className={props.className} aria-label={hrefTitle}>
        {props.children}
      </a>
    );
  }

  // if url has an extension, we'll assume it's some sort of asset
  if (href.match(fileExtensionRegex)) {
    return (
      <a href={href} title={hrefTitle} className={props.className} aria-label={hrefTitle}>
        {props.children}
      </a>
    );
  }

  // use gatsby link for relative urls so we hook into react router
  return (
    <Link to={`${href.toLowerCase()}${href.endsWith('/') ? '' : '/'}`} className={props.className} aria-label={`${href.toLowerCase()}${href.endsWith('/') ? '' : '/'}`}>
      {props.children}
    </Link>
  );
};

SmartLink.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
};

SmartLink.defaultProps = {
  className: '',
  children: null,
};

export default SmartLink;
