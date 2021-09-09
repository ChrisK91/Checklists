---
title: Protective lung ventilation
date: 2021-09-02
description: Protective lung ventilation is an established standard for ventilated patients. This checklist outlines settings and management.
tags: [checklist, general, ventilation]
toc: True
comments: true
postid: 39f24a2e3b654b86b163fdbb0e6d1c80
---

## General

Protective lung ventilation aims for low tidal volume ventilation. A [large study](https://www.nejm.org/doi/full/10.1056/NEJM200005043421801) has shown a markedly decrease in mortality, when patients with acute lung injury/ARDS were ventilated with low tidal volumes. Today, the protective lung ventilation algorithm by the ARDS network provides a reasonable default approach for mechanically ventilated patients, especially those at risk for developing ARDS

## Ventilation setup and adjustment

- Calculate the predicted body weight (men: 50 + 0.91 (length in cm - 152), women: 45 + 0.91 (length in cm - 152)). A calculator using this *Devin formula* can be found with the [nutrition calculators]({{< relref "calculators/nutrition">}})
- Initial tidal volume Vt = 8ml/kg predicted body weight
  - Reduce Vt by 1 ml/kg at intervals up to 2 hours until Vt = 6 ml/kg/PBW
- set RR (respiratory rate) to baseline ventilation, but not over 35/min
- adjust Vt and RR to achieve pH and plateau pressure goal

## Oxygenation Goal

- Goal: paO₂ 55 - 88 mmHg or SpO₂ 88 - 95 %
- use PEEP minimum 5 cmH₂O
- consider using FiO2/PEEP table:

| FiO₂ | low PEEP | high PEEP |
| :--: | :------: | :-------: |
| 0.3  |    5     |  5 - 14   |
| 0.4  |  5 - 8   |  14 - 16  |
| 0.5  |  8 - 10  |  16 - 20  |
| 0.6  |    10    |    20     |
| 0.7  | 10 - 14  |    20     |
| 0.8  |    14    |  20 - 22  |
| 0.9  | 14 - 18  |    22     |
| 1.0  | 18 - 24  |  22 - 24  |

## Plateau pressure

- Goal: plateau pressure <= 30 cmH₂O
- if pPlat > 30 cmH₂O
  - decrease Vt by 1 ml/kg until minimum Vt 4 ml/kg is reached
- if pPlat < 25 cmH₂O and Vt < 6 ml/kg
  - increase Vt by 1 ml/kg Pplat > 25 cmH₂O or Vt = 6 ml/kg

## pH

- Goal: pH 7.3 - 7.45
- Acidosis:
  - pH < 7.3: Increase RR until pH > 7.3 or PaCO₂ < 25 mmHg
    - maximum RR 35/min
  - pH < 7.15: Increase RR to 35/min
    - if pH remains < 7.15: increase Vt in 1 ml/kg steps until pH > 7.15 (target of 30 cmH₂O max be exceeded)
    - consider NaHCO₃
- Alkalosis
  - pH > 7.45: Decrease RR if possible

## Permissive hypercapnia

Elevated PaCO₂ can be the result of low volumes and should be tolerated, as long as the pH is manageable. The articles I've come across so far suggest an pH > 7.1 or > 7.2 as tolerable.
