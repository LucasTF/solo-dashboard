import regex

from src.enums.logradouros import Logradouro
from src.enums.ufs import Uf


def validate_at_least_one_letter_and_whitespace(sample: str) -> str:
    """Check if given string contains at least one letter and any number of whitespaces

    Args:
        sample (str): string of text to be tested.

    Returns:
        str: string used as the sample argument.

    Exceptions:
        ValueError: Raises an ValueError exception if sample string does not conform to specifications.
    """

    # Regular expression pattern to check if the string contains only letters (including diacritics) and whitespace
    # and contains at least one letter.
    pattern = r'^(?=.*\p{L})[\p{L}\s]+$'

    if bool(regex.match(pattern, sample)):
        return sample
        
    raise ValueError("Nome deve conter, pelo menos, uma letra e deve conter apenas letras e espaços.")

def validate_cep(sample: str) -> str:
    """Check if given string obeys the cep format 'XXXXX-XXX' where X must be a number between 0-9.

    Args:
        sample (str): string of text to be tested.

    Returns:
        str: string used as the sample argument.

    Exceptions:
        ValueError: Raises an ValueError exception if sample string does not conform to cep format.
    """

    pattern = r'^\d{5}-\d{3}$'

    if bool(regex.match(pattern, sample)):
        return sample
    
    raise ValueError("CEP deve estar no formato: 'XXXXX-XXX', onde X deve ser um número entre 0-9.")

def validate_cpf(sample: str) -> str:
    """Check if given string obeys the cpf format 'XXX.XXX.XXX-XX' where X must be a number between 0-9.

    Args:
        sample (str): string of text to be tested.

    Returns:
        str: string used as the sample argument.

    Exceptions:
        ValueError: Raises an ValueError exception if sample string does not conform to cpf format.
    """

    pattern = r'^\d{3}\.\d{3}\.\d{3}-\d{2}$'

    if bool(regex.match(pattern, sample)):
        return sample
    
    raise ValueError("CPF deve estar no formato: 'XXX.XXX.XXX-XX', onde X deve ser um número entre 0-9.")

def validate_uf(sample: str) -> str:
    """Check if given string is within uf enum values.

    Args:
        sample (str): string of text to be tested.

    Returns:
        str: string used as the sample argument.

    Exceptions:
        ValueError: Raises an ValueError exception if sample string is not present in uf enum.
    """

    if len(sample) == 2:
        if Uf.has_value(sample):
            return sample
    
    raise ValueError("UF inválida.")

def validate_tipo_logo(sample: str) -> str:
    """Check if given string is within logradouro enum values.

    Args:
        sample (str): string of text to be tested.

    Returns:
        str: string used as the sample argument.

    Exceptions:
        ValueError: Raises an ValueError exception if sample string is not present in logradouro enum.
    """

    if Logradouro.has_value(sample):
        return sample
    
    raise ValueError("Tipo de logradouro inválido.")

def validate_cnpj(sample: str) -> str:
    """Check if given string obeys the cnpj format 'XX.XXX.XXX/XXXX-XX' where X must be a number between 0-9.

    Args:
        sample (str): string of text to be tested.

    Returns:
        str: string used as the sample argument.

    Exceptions:
        ValueError: Raises an ValueError exception if sample string does not conform to cnpj format.
    """

    pattern = r'^\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}$'

    if bool(regex.match(pattern, sample)):
        return sample
    
    raise ValueError("CNPJ deve estar no formato: 'XX.XXX.XXX/XXXX-XX', onde X deve ser um número entre 0-9.")

