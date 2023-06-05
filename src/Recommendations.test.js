import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Recommendations from './Recommendations';

const renderRecommendations = (props) => {
  return render(<Recommendations {...props} />);
};

test('Recommendations are calculated correctly', () => {
  const profileData = {
    age: 25,
    weight: 70,
    height: 175,
    gender: 'male',
    activityLevel: 'moderate',
  };

  renderRecommendations(profileData);

  expect(screen.getByTestId('recommendations-container')).toContainHTML('<p>2594 kcal</p>');
  expect(screen.getByTestId('recommendations-container2')).toContainHTML('<p>2333 ml</p>');
  expect(screen.getByTestId('recommendations-container3')).toContainHTML('<p>7-9 hours</p>');
});
