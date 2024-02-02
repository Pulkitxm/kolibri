import { render } from '@testing-library/vue';
import '@testing-library/jest-dom';
import VueRouter from 'vue-router';
import AttemptTextDiff from '../AttemptTextDiff.vue';

const renderComponent = props => {
  return render(AttemptTextDiff, {
    routes: new VueRouter(),
    props,
    store: {
      getters: {
        currentUserId: () => 'mockUser1',
      },
    },
  });
};

const testCases = [
  {
    caseName: 'Second Person Perspective: Answer Improved',
    correct: 1,
    diff: 1,
    userId: 'mockUser1',
    expectedMessage: 'You improved your incorrect answer from the previous attempt',
  },
  {
    caseName: 'Second Person Perspective: Incorrect Answer',
    correct: 0,
    diff: 0,
    userId: 'mockUser1',
    expectedMessage: 'You also answered this incorrectly on the previous attempt',
  },
  {
    caseName: 'Second Person Perspective: Correct Answer',
    correct: 0,
    diff: -1,
    userId: 'mockUser1',
    expectedMessage: 'You answered this correctly on the previous attempt',
  },
  {
    caseName: 'Third Person Perspective: Answer Improved',
    correct: 1,
    diff: 1,
    userId: 'mockUser2',
    expectedMessage: 'Learner improved their incorrect answer from the previous attempt',
  },
  {
    caseName: 'Third Person Perspective: Incorrect Answer',
    correct: 0,
    diff: 0,
    userId: 'mockUser2',
    expectedMessage: 'Learner also answered this incorrectly on the previous attempt',
  },
  {
    caseName: 'Third Person Perspective: Correct Answer',
    correct: 0,
    diff: -1,
    userId: 'mockUser2',
    expectedMessage: 'Learner answered this correctly on the previous attempt',
  },
];

describe('AttemptTextDiff', () => {
  testCases.forEach(({ caseName, correct, diff, userId, expectedMessage }) => {
    test(caseName, () => {
      const { getByText } = renderComponent({ correct, diff, userId });
      expect(getByText(expectedMessage)).toBeInTheDocument();
    });
  });

  test('No text is shown when the props are invalid', () => {
    const { queryByTestId } = renderComponent({ correct: 1, diff: 0, userId: 'mockUser1' });
    expect(queryByTestId('attempt-text-diff')).not.toBeInTheDocument();
  });
});
