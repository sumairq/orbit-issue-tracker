import React from 'react';
import PropTypes from 'prop-types';

import Logo from 'shared/components/Logo';
import Icon from 'shared/components/Icon';

import boardPreview from './assets/preview-board.png';
import analyticsPreview from './assets/preview-analytics.png';
import {
  Page,
  Showcase,
  ShowcaseInner,
  Brand,
  BrandName,
  ValueProp,
  ValuePropSub,
  FeatureList,
  FeatureItem,
  FeatureIcon,
  FeatureText,
  PreviewStage,
  PreviewWindow,
  PreviewBar,
  PreviewImg,
  PreviewFloat,
  PreviewFloatImg,
  FormPanel,
  FormInner,
  MobileBrand,
  MobileBrandName,
  Heading,
  Subheading,
  GuestButton,
  GuestIcon,
  GuestText,
  Divider,
  Footer,
  FooterLink,
} from './Styles';

const features = [
  { icon: 'board', title: 'Kanban boards', desc: 'Drag issues from backlog to done.' },
  { icon: 'reports', title: 'Analytics', desc: 'Status, priority and workload at a glance.' },
  { icon: 'menu', title: 'List view', desc: 'Filter, sort and bulk-edit in a dense table.' },
];

/**
 * Shared shell for Sign In and Sign Up so they read as one system: a branded
 * showcase panel (left) + a focused form column (right). The demo/guest login is
 * surfaced here as a prominent, first-class call to action above the form.
 *
 * This is presentation only — the parent owns the form (`children`), the guest
 * handler (`onGuest`) and the busy state (`busy`); behaviour is unchanged.
 */
const AuthLayout = ({
  heading,
  subheading,
  dividerLabel,
  onGuest,
  busy,
  switchPrompt,
  switchTo,
  switchLabel,
  children,
}) => (
  <Page>
    <Showcase>
      <ShowcaseInner>
        <Brand>
          <Logo size={40} color="#fff" />
          <BrandName>Orbit</BrandName>
        </Brand>

        <ValueProp>Where teams plan, track and ship.</ValueProp>
        <ValuePropSub>
          The lightweight issue tracker for moving work from idea to done — boards,
          analytics and a powerful list view in one place.
        </ValuePropSub>

        <FeatureList>
          {features.map(feature => (
            <FeatureItem key={feature.title}>
              <FeatureIcon>
                <Icon type={feature.icon} size={18} />
              </FeatureIcon>
              <FeatureText>
                {feature.title}
                <span>{feature.desc}</span>
              </FeatureText>
            </FeatureItem>
          ))}
        </FeatureList>

        <PreviewStage aria-hidden="true">
          <PreviewWindow>
            <PreviewBar>
              <span />
              <span />
              <span />
            </PreviewBar>
            <PreviewImg src={boardPreview} alt="" />
          </PreviewWindow>
          <PreviewFloat>
            <PreviewBar>
              <span />
              <span />
              <span />
            </PreviewBar>
            <PreviewFloatImg src={analyticsPreview} alt="" />
          </PreviewFloat>
        </PreviewStage>
      </ShowcaseInner>
    </Showcase>

    <FormPanel>
      <FormInner>
        <MobileBrand>
          <Logo size={30} />
          <MobileBrandName>Orbit</MobileBrandName>
        </MobileBrand>

        <Heading>{heading}</Heading>
        <Subheading>{subheading}</Subheading>

        <GuestButton type="button" onClick={onGuest} disabled={busy}>
          <GuestIcon>
            <Icon type="arrow-right" size={18} />
          </GuestIcon>
          <GuestText>
            Explore the live demo
            <span>Jump into a seeded board — no sign-up needed.</span>
          </GuestText>
        </GuestButton>

        <Divider>{dividerLabel}</Divider>

        {children}

        <Footer>
          {switchPrompt} <FooterLink to={switchTo}>{switchLabel}</FooterLink>
        </Footer>
      </FormInner>
    </FormPanel>
  </Page>
);

AuthLayout.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  dividerLabel: PropTypes.string.isRequired,
  onGuest: PropTypes.func.isRequired,
  busy: PropTypes.bool.isRequired,
  switchPrompt: PropTypes.string.isRequired,
  switchTo: PropTypes.string.isRequired,
  switchLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
