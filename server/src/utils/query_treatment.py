def get_positive_query_param(param: str | None, default: int) -> int:
    int_param = get_integer_query_param(param, default)

    if int_param < 1:
        return default
    
    return int_param

def get_integer_query_param(param: str | None, default: int) -> int:
    if param is None:
        return default
    
    try:
        cast_param = int(param)
        return cast_param
    except ValueError:
        return default