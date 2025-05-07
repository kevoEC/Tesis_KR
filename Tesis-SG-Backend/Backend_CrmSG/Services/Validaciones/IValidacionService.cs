using Backend_CrmSG.DTOs;

namespace Backend_CrmSG.Services.Validaciones
{
    public interface IValidacionService
    {
        Task<EquifaxResponseDto?> ValidarEquifaxAsync(EquifaxRequestDto dto);
        Task<LdsResponseDto?> ValidarLdsAsync(LdsRequestDto dto);
    }
}
