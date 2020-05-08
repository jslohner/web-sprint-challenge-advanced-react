import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
	const { getByText } = render(<CheckoutForm />);

	const formHeader = getByText(/checkout form/i);

	expect(formHeader).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
	const { getByText, getByLabelText, getByRole, getByTestId } = render(<CheckoutForm />);

	const firstNameInput = getByLabelText(/first name/i);
	const lastNameInput = getByLabelText(/last name/i);
	const addressInput = getByLabelText(/address/i);
	const cityInput = getByLabelText(/city/i);
	const stateInput = getByLabelText(/state/i);
	const zipInput = getByLabelText(/zip/i);
	const submitButton = getByRole("button" ,/checkout/i);

	expect(firstNameInput).toBeInTheDocument();
	expect(lastNameInput).toBeInTheDocument();
	expect(addressInput).toBeInTheDocument();
	expect(cityInput).toBeInTheDocument();
	expect(stateInput).toBeInTheDocument();
	expect(zipInput).toBeInTheDocument();
	expect(submitButton).toBeInTheDocument();

	fireEvent.change(firstNameInput, { target: { value: "Justin" } });
	fireEvent.change(lastNameInput, { target: { value: "Lohner" } });
	fireEvent.change(addressInput, { target: { value: "600 North 355 West" } });
	fireEvent.change(cityInput, { target: { value: "Salt Lake City" } });
	fireEvent.change(stateInput, { target: { value: "Utah" } });
	fireEvent.change(zipInput, { target: { value: "84103" } });
	fireEvent.click(submitButton);

	expect(getByTestId("successMessage")).toBeInTheDocument();

	const messageName = getByText("Justin Lohner");
	const messageAddress = getByText("600 North 355 West");
	const messageLocation = getByText("Salt Lake City, Utah 84103");

	expect(messageName).toBeInTheDocument();
	expect(messageAddress).toBeInTheDocument();
	expect(messageLocation).toBeInTheDocument();
});
