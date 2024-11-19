import { render, fireEvent, cleanup, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { TodoControlPanel, ComponentControlPanelProps } from '../TodoControlPanel';
import { testTaskList } from '../constant';

let mockDeleteComplitedItem: ReturnType<typeof vi.fn>;
let mockOnFilterChange: ReturnType<typeof vi.fn>;
let countElement: HTMLElement;
let clearButton: HTMLButtonElement;
let filterInputElement: HTMLInputElement[] = [];

const inputFilterIdArr: string[] = ['checkAll', 'checkActive', 'checkCompleted'];

const renderControlPanel = (props: Partial<React.ComponentProps<typeof TodoControlPanel>> = {}): RenderResult => {
  const defaultProps: ComponentControlPanelProps = {
    list: testTaskList,
    deleteComplitedItem: mockDeleteComplitedItem,
    onFilterChange: mockOnFilterChange,
  };

  return render(<TodoControlPanel {...defaultProps} {...props} />);
};

describe('TodoControlPanel Component', () => {
  beforeEach(() => {
    mockDeleteComplitedItem = vi.fn();
    mockOnFilterChange = vi.fn();

    const { getByText, getByRole } = renderControlPanel();

    countElement = getByText('1 items left') as HTMLElement;
    clearButton = getByText('Clear completed') as HTMLButtonElement;
    filterInputElement = inputFilterIdArr.map(id => getByRole('radio', { name: id }) as HTMLInputElement);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders TodoControlPanel', () => {
    filterInputElement.forEach((el, index) => {
      expect(el).toBeInTheDocument();

      if (index === 0) {
        expect(el).toBeChecked();
      } else {
        expect(el).not.toBeChecked();
      }
    });

    expect(countElement).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it('check correct count', () => {
    expect(countElement.textContent).toBe('1 items left');
  });

  it('calls correct onFilterChange after click', () => {
    filterInputElement.forEach(element => {
      fireEvent.click(element);

      switch (element.id) {
        case 'checkActive':
          expect(mockOnFilterChange).toHaveBeenCalledWith('Active');
          break;
        case 'checkCompleted':
          expect(mockOnFilterChange).toHaveBeenCalledWith('Completed');
          break;
        default:
          expect(mockOnFilterChange).toHaveBeenCalledWith('All');
          break;
      }
    });
  });

  it('calls deleteComplitedItem after click clear button', () => {
    fireEvent.click(clearButton);
    expect(mockDeleteComplitedItem).toHaveBeenCalled();
  });
});
