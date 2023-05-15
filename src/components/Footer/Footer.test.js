const { render, screen } = require("@testing-library/react");
const { Footer } = require("./Footer");

jest.mock("react-router-dom", () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe("Footer component", () => {
  describe("Test logo", () => {
    test("Is the footer contains the text Bulgarian, part of the logo", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Bulgarian/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text Falvor, part of the logo", () => {
      setTimeout(() => {
        render(<Footer />);
        const bulgarianText = screen.getByText(/Falvor/);
        expect(bulgarianText).toBeInTheDocument();
      }, 1500);
    });
  });
  describe("First list", () => {
    test("Is the footer contains the text link Начало", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Начало/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Вино и храна", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Вино и храна/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Следваща дестинация", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Следваща дестинация/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Инициативи за туризма", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Инициативи за туризма/);
      expect(bulgarianText).toBeInTheDocument();
    });
  });
  describe("Second list", () => {
    test("Is the footer contains the text link За мен", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/За мен/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Мисия и цели", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Мисия и цели/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Контакти", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Контакти/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Вход", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Вход/);
      expect(bulgarianText).toBeInTheDocument();
    });
  });
  describe("Third list", () => {
    test("Is the footer contains the text link Условия за ползване", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Условия за ползване/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Политика за поверителност", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Политика за поверителност/);
      expect(bulgarianText).toBeInTheDocument();
    });
    test("Is the footer contains the text link Рекламирай тук", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(/Рекламирай тук/);
      expect(bulgarianText).toBeInTheDocument();
    });
  });
  describe("test logo", () => {
    test("Is the footer contains conpy with content © 2023 - Ilia Vatafov - All Rights Reserved", () => {
      render(<Footer />);
      const bulgarianText = screen.getByText(
        /© 2023 - Ilia Vatafov - All Rights Reserved/
      );
      expect(bulgarianText).toBeInTheDocument();
    });
  });
});
