import random

class Questions:
    @staticmethod
    def get_question(question_type):
        """
        Method to get a question based on the question type.
        """
        if question_type == "stoichiometry":
            return Questions.stoichiometry()
        elif question_type == "balancing":
            return Questions.balancing()
        elif question_type == "molarity":
            return Questions.molarity()
        else:
            return {"error": "Invalid question type"}

    @staticmethod
    def stoichiometry():
        """
        Generates a stoichiometry question with limiting reagent calculations.
        Example: "Given 3 moles of H2 and 2 moles of O2, how many moles of H2O are produced?"
        """
        # Define 8 different reactions with their mole ratios
        reactions = [
            {"reactants": {"H2": 2, "O2": 1}, "products": {"H2O": 2}},  # 2H2 + O2 -> 2H2O
            {"reactants": {"N2": 1, "H2": 3}, "products": {"NH3": 2}},  # N2 + 3H2 -> 2NH3
            {"reactants": {"C3H8": 1, "O2": 5}, "products": {"CO2": 3, "H2O": 4}},  # C3H8 + 5O2 -> 3CO2 + 4H2O
            {"reactants": {"CH4": 1, "O2": 2}, "products": {"CO2": 1, "H2O": 2}},  # CH4 + 2O2 -> CO2 + 2H2O
            {"reactants": {"Fe": 4, "O2": 3}, "products": {"Fe2O3": 2}},  # 4Fe + 3O2 -> 2Fe2O3
            {"reactants": {"C2H6": 2, "O2": 7}, "products": {"CO2": 4, "H2O": 6}},  # 2C2H6 + 7O2 -> 4CO2 + 6H2O
            {"reactants": {"HCl": 2, "NaOH": 1}, "products": {"NaCl": 1, "H2O": 1}},  # 2HCl + NaOH -> NaCl + H2O
            {"reactants": {"CaCO3": 1, "HCl": 2}, "products": {"CaCl2": 1, "CO2": 1, "H2O": 1}},  # CaCO3 + 2HCl -> CaCl2 + CO2 + H2O
        ]

        # Randomly select a reaction
        reaction = random.choice(reactions)

        # Randomly assign moles for each reactant
        reactant_moles = {reactant: random.randint(1, 10) for reactant in reaction["reactants"]}

        # Calculate the limiting reagent
        limiting_reagent = None
        limiting_moles = float("inf")
        for reactant, ratio in reaction["reactants"].items():
            available_moles = reactant_moles[reactant] / ratio
            if available_moles < limiting_moles:
                limiting_moles = available_moles
                limiting_reagent = reactant

        # Calculate the amount of each product formed
        product_moles = {
            product: round(ratio * limiting_moles, 2)
            for product, ratio in reaction["products"].items()
        }

        # Generate the question
        reactants_str = " and ".join(
            [f"{moles} moles of {reactant}" for reactant, moles in reactant_moles.items()]
        )
        products_str = ", ".join(
            [f"{moles} moles of {product}" for product, moles in product_moles.items()]
        )
        question = (
            f"Given {reactants_str}, what is the limiting reagent and how many moles of each product are formed? "
            f"The reaction is: {Questions.format_reaction(reaction)}"
        )

        # Prepare the answer
        answer = {
            "limiting_reagent": limiting_reagent,
            "products": product_moles,
        }

        return {"question": question, "answer": answer}

    @staticmethod
    def format_reaction(reaction):
        """
        Formats a reaction dictionary into a readable string.
        Example: "2H2 + O2 -> 2H2O"
        """
        reactants = " + ".join(
            [f"{coef}{compound}" for compound, coef in reaction["reactants"].items()]
        )
        products = " + ".join(
            [f"#{compound}" for compound, coef in reaction["products"].items()]
        )
        return f"{reactants} -> {products}"

   # Temp that is just a placeholder so we could have 3
    @staticmethod
    def balancing():
        """
        Generates a balancing chemical equation question.
        Example: "Balance the equation: H2 + O2 -> H2O"
        """
        equations = [
            {"equation": "H2 + O2 -> H2O", "answer": "2H2 + O2 -> 2H2O"},
            {"equation": "N2 + H2 -> NH3", "answer": "N2 + 3H2 -> 2NH3"},
            {"equation": "C3H8 + O2 -> CO2 + H2O", "answer": "C3H8 + 5O2 -> 3CO2 + 4H2O"},
        ]
        selected = random.choice(equations)

        question = f"Balance the equation: {selected['equation']}"
        answer = selected["answer"]

        return {"question": question, "answer": answer}

   # Temp that is just a placeholder so we could have 3
    @staticmethod
    def molarity():
        """
        Generates a molarity question.
        Example: "What is the molarity of a solution with 2 moles of solute in 1 liter of solution?"
        """
        moles = random.randint(1, 5)
        volume = random.randint(1, 3)  # Volume in liters
        molarity = round(moles / volume, 2)

        question = f"What is the molarity of a solution with {moles} moles of solute in {volume} liters of solution?"
        answer = str(molarity)

        return {"question": question, "answer": answer}
