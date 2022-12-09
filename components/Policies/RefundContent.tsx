import SectionTitle from '@components/Shared/SectionTitle';
import React from 'react';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const RefundContent: React.FC = () => {
  return (
    <div className="container px-4 mx-auto antialiased mb-28">
      <SectionTitle title="Spacejoy Refund Policy" feature={`Last Updated: Jan 02nd, ${currentYear}`} />
      <div className="mt-6">
        <h1 className="mb-2 text-xl">Hi There!</h1>
        <p className="text-base text-gray-500">
          Spacejoy is a small but dedicated team of interior designers, 3D artists, developers, and other superstars who
          handle several miscellaneous tasks. Our team is passionate about all things design, and we aim to offer the
          best experience to you through our interior designs and products. That said, if you’re here reading our refund
          policy, it means there’s a glitch. We think everything can be resolved with an open and honest conversation.
          <br />
          Please write to us at <a href="mailto:hello@spacejoy.com">hello@spacejoy.com</a>, and your design assistants
          will make every effort to turn things around. Our aim is to make sure your experience with us is as amazing as
          possible. However, if you think there is nothing we can do to fix the situation, read on to see how our refund
          policy works.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg">Didn&apos;t intend to place an order?</h3>
        <p className="text-base text-gray-500">
          If you placed an order for a design package on Spacejoy by mistake and are not ready to get started on your
          design yet, you&apos;re entitled to a full refund. Provided you request a refund within 48 hours of placing
          the order. Why? A designer is assigned to your project as soon as you place the order. Within the first 48
          hours, your designer does a lot of groundwork to prepare your design. If you cancel the order within the first
          48 hours, we can notify your designer, so they do not continue to do any extra work. (Aren&apos;t we all
          bummed when that happens?).
        </p>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg">Not happy with your design concepts?</h3>
        <p className="text-base text-gray-500">
          Spacejoy&apos;s team of online interior designers are experts and absolute professionals, and as that, we take
          a lot of pride in our design team. However, sometimes, we all have off days (happens to the best of us).
          <br />
          If you feel the final designs your designer delivered lacks the vision you have for your space, please reach
          out to us at hello@spacejoy.com so we can find a resolution. If your design is in the re-design phase and you
          think there is a mismatch between you and your designer, we&apos;ll try and match you with a new designer to
          correct the course.
          <br />
          In the event that our team determines that your design project qualifies for a refund, our claims team will
          get in touch with you to understand what went wrong and will have the final authority on approving the claim.
          Full refunds only apply to projects that have not been started, or projects that have been delivered within
          the last 30 days. If the project was delivered over 30 days ago, we can only offer a partial refund (to be
          determined by the claims team).
        </p>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg">Inactivity Terms</h3>
        <p className="text-base text-gray-500">
          In the scenario where you paid for a design package on Spacejoy and completely lost track of it because there
          were other pressing matters to tend to, don’t worry, your design credit is safe with us. You can choose to
          come back and kickstart your project when you have the time at hand, within a year. We’ll also knock at your
          door a month before your order expires on Spacejoy to check if you’re ready to design with us. If you’re still
          not available, we’ll store it as store credits for you to redeem it on Spacejoy later.
        </p>
        <p className="text-base text-gray-500">
          In the scenario where you started a project and forgot all about it before we were to deliver the final design
          concepts, we will make several attempts to catch your attention and nudge you back to your project ( we
          understand shiny object syndrome). However, if we don’t hear back from you, then in 30 days, your project will
          be tagged inactive. Your order remains with us. You can come back at a later date and pick up where you left
          off. Your designer, however, will move on to a different project because- duty beckons. When you decide to
          restart, write to us at hello@spacejoy.com and we will re-assign your project to an expert designer.
        </p>
      </div>
      <div className="mt-6">
        <h3 className="mb-2 text-lg">Redesign Terms</h3>
        <p className="text-base text-gray-500">
          We offer multiple redesigns to make sure you fall in love with your new space. Make sure to send in your
          feedback with design changes within 30 days of receiving your latest design concept. If we don&apos;t hear
          from you within 30 days, your designer will close your project. If you, however, want to request changes after
          30 days, your request will undergo a review before we can commit.
        </p>
      </div>
    </div>
  );
};

export default RefundContent;
