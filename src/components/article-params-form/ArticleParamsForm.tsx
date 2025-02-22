import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { useEffect, useRef, useState } from 'react';

type ArticleSettings = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

type ArticleParamsFormProps = {
	handleChangeFormSettings: (value: ArticleSettings) => void;
	articleSettings: ArticleSettings;
};

export const ArticleParamsForm = ({
	handleChangeFormSettings,
	articleSettings,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [tempSettings, setTempSettings] = useState(articleSettings);
	const asideRef = useRef<HTMLElement>(null);

	const defaultSettings: ArticleSettings = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
	};

	const handleChangeTempSettings = (key: string, value: OptionType) => {
		setTempSettings((prev: ArticleSettings) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleChangeFormSettings(tempSettings);
	};

	const handleReset = () => {
		setTempSettings(defaultSettings);
		handleChangeFormSettings(defaultSettings);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
			/>

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						onChange={(option) =>
							handleChangeTempSettings('fontFamily', option)
						}
						placeholder={defaultSettings.fontFamily.title}
						selected={tempSettings.fontFamily}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						name='Размер'
						selected={tempSettings.fontSize}
						onChange={(option) => handleChangeTempSettings('fontSize', option)}
					/>
					<Select
						title='Цвет шрифта'
						placeholder={defaultSettings.fontColor.title}
						selected={tempSettings.fontColor}
						options={fontColors}
						onChange={(option) => handleChangeTempSettings('fontColor', option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						placeholder={defaultSettings.backgroundColor.title}
						selected={tempSettings.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							handleChangeTempSettings('backgroundColor', option)
						}
					/>
					<Select
						title='Ширина контента'
						placeholder={defaultSettings.contentWidth.title}
						selected={tempSettings.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							handleChangeTempSettings('contentWidth', option)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
