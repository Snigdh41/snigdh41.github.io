import React from 'react';
import { render, screen } from '@testing-library/react';
import { useScrollReveal, useStaggerReveal } from './useScrollReveal';

describe('Scroll Reveal Hooks', () => {
  let observeMock;
  let unobserveMock;
  let disconnectMock;
  let observerCallback;

  beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();
    disconnectMock = jest.fn();
    observerCallback = null;

    global.IntersectionObserver = class IntersectionObserver {
      constructor(callback) {
        observerCallback = callback;
      }
      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = disconnectMock;
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete global.IntersectionObserver;
  });

  describe('useScrollReveal', () => {
    function SingleRevealComponent({ options }) {
      const ref = useScrollReveal(options);
      return <div ref={ref} data-testid="single-reveal">Reveal Me</div>;
    }

    it('applies initial styles and starts observing', () => {
      render(<SingleRevealComponent />);
      const el = screen.getByTestId('single-reveal');

      expect(el).toHaveStyle({
        opacity: '0',
        transform: 'translateY(30px)'
      });
      expect(el.style.transition).toContain('opacity 800ms');

      expect(observeMock).toHaveBeenCalledWith(el);
    });

    it('reveals element and unobserves when intersecting (once: true)', () => {
      render(<SingleRevealComponent options={{ once: true }} />);
      const el = screen.getByTestId('single-reveal');

      // Trigger intersection
      observerCallback([{ isIntersecting: true, target: el }]);

      expect(el).toHaveStyle({
        opacity: '1',
        transform: 'translateY(0)'
      });
      expect(unobserveMock).toHaveBeenCalledWith(el);
    });

    it('reveals element but keeps observing when intersecting (once: false)', () => {
      render(<SingleRevealComponent options={{ once: false }} />);
      const el = screen.getByTestId('single-reveal');

      // Trigger intersection
      observerCallback([{ isIntersecting: true, target: el }]);

      expect(el).toHaveStyle({
        opacity: '1',
        transform: 'translateY(0)'
      });
      expect(unobserveMock).not.toHaveBeenCalled();
    });

    it('does nothing if not intersecting', () => {
      render(<SingleRevealComponent />);
      const el = screen.getByTestId('single-reveal');

      observerCallback([{ isIntersecting: false, target: el }]);

      expect(el).toHaveStyle({
        opacity: '0',
        transform: 'translateY(30px)'
      });
    });

    it('disconnects on unmount', () => {
      const { unmount } = render(<SingleRevealComponent />);
      unmount();
      expect(disconnectMock).toHaveBeenCalled();
    });
  });

  describe('useStaggerReveal', () => {
    function StaggerComponent({ count, options }) {
      const setRef = useStaggerReveal(count, options);
      return (
        <div data-testid="container">
          <div ref={setRef(0)} data-testid="item-0">Item 0</div>
          <div ref={setRef(1)} data-testid="item-1">Item 1</div>
        </div>
      );
    }

    it('applies initial styles with stagger delays and observes container', () => {
      render(<StaggerComponent count={2} />);
      const item0 = screen.getByTestId('item-0');
      const item1 = screen.getByTestId('item-1');
      const container = screen.getByTestId('container');

      expect(item0).toHaveStyle({ opacity: '0', transform: 'translateY(40px)' });
      expect(item1).toHaveStyle({ opacity: '0', transform: 'translateY(40px)' });

      expect(item0.style.transition).toContain('0ms');
      expect(item1.style.transition).toContain('100ms');

      expect(observeMock).toHaveBeenCalledWith(container);
    });

    it('reveals all items and unobserves container when intersecting', () => {
      render(<StaggerComponent count={2} />);
      const item0 = screen.getByTestId('item-0');
      const item1 = screen.getByTestId('item-1');
      const container = screen.getByTestId('container');

      // Trigger intersection
      observerCallback([{ isIntersecting: true, target: container }]);

      expect(item0).toHaveStyle({ opacity: '1', transform: 'translateY(0)' });
      expect(item1).toHaveStyle({ opacity: '1', transform: 'translateY(0)' });

      expect(unobserveMock).toHaveBeenCalledWith(container);
    });

    it('disconnects on unmount', () => {
      const { unmount } = render(<StaggerComponent count={2} />);
      unmount();
      expect(disconnectMock).toHaveBeenCalled();
    });

    it('does nothing if no elements are rendered', () => {
      function EmptyStaggerComponent() {
        useStaggerReveal(0);
        return <div />;
      }
      render(<EmptyStaggerComponent />);
      expect(observeMock).not.toHaveBeenCalled();
    });
  });
});
