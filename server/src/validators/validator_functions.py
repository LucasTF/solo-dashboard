import regex


def contains_at_least_one_letter_and_whitespace(sample: str) -> bool:
    """Check if given string contains at least one letter and any number of whitespaces

    Args:
        sample (str): string of text to be tested.

    Returns:
        bool: Returns True if given string contains at least one letter and any number of whitespaces. Returns False otherwise.
    """

    # Regular expression pattern to check if the string contains only letters (including diacritics) and whitespace
    # and contains at least one letter.
    pattern = r'^(?=.*\p{L})[\p{L}\s]+$'

    return bool(regex.match(pattern, sample))

def is_valid_cep(sample: str) -> bool:
    """Check if given string obeys the cep format 'XXXXX-XXX' where X must be a number between 0-9.

    Args:
        sample (str): string of text to be tested.

    Returns:
        bool: Returns True if given string obeys the cep format. Returns False otherwise.
    """

    pattern = r'^\d{5}-\d{3}$'

    return bool(regex.match(pattern, sample))